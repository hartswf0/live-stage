/* =========================================================================
   LIVE STAGE — shared clip manifest
   -------------------------------------------------------------------------
   One source of truth for the 27 synthetic "meeting participant" loops that
   live in ./media. Every interface (index, zoom-stage, zoom-scene6, vilo)
   reads window.LIVE_STAGE and auto-wires itself — no manual drag-drop needed.

   CAST: each participant id used across the interfaces maps to ONE actor so a
   given tile keeps the same face. Behaviour slots (talk/listen/react/extra)
   point at that actor's loops; where an actor is missing a behaviour we reuse
   their closest loop so every slot is filled.
   ========================================================================= */
(function () {
  var DIR = 'media/';

  // Flat catalogue — label + a coarse behaviour tag, used by the index gallery.
  var CLIPS = [
    { file: 'aa-man-listening',          who: 'African-American man', act: 'Listening',          tag: 'listen' },
    { file: 'aa-man-coffee',             who: 'African-American man', act: 'Sipping coffee',      tag: 'idle'   },
    { file: 'aa-man-typing',             who: 'African-American man', act: 'Typing a message',    tag: 'idle'   },
    { file: 'aa-man-watching',           who: 'African-American man', act: 'Watching the screen', tag: 'listen' },
    { file: 'asian-woman-listen-lens',   who: 'Asian woman',          act: 'Listening to lens',   tag: 'listen' },
    { file: 'asian-woman-listen-webcam', who: 'Asian woman',          act: 'Listening on webcam', tag: 'listen' },
    { file: 'asian-woman-screen',        who: 'Asian woman',          act: 'Looking at screen',   tag: 'talk'   },
    { file: 'asian-woman-pen',           who: 'Asian woman',          act: 'Playing with a pen',  tag: 'idle'   },
    { file: 'latino-man-laughing',       who: 'Latino man',           act: 'Laughing at monitor', tag: 'react'  },
    { file: 'latino-man-camera',         who: 'Latino man',           act: 'Looking at camera',   tag: 'talk'   },
    { file: 'latino-man-lens',           who: 'Latino man',           act: 'Looking at lens',     tag: 'listen' },
    { file: 'latino-man-pen',            who: 'Latino man',           act: 'Tapping a pen',       tag: 'idle'   },
    { file: 'latino-man-webcam',         who: 'Latino man',           act: 'Webcam behaviour',    tag: 'idle'   },
    { file: 'man-confused',              who: 'Man',                  act: 'Confused by screen',  tag: 'react'  },
    { file: 'man-leaning',               who: 'Man',                  act: 'Leaning back',        tag: 'react'  },
    { file: 'man-listening',             who: 'Man',                  act: 'Listening on webcam', tag: 'listen' },
    { file: 'man-looking',               who: 'Man',                  act: 'Looking at webcam',   tag: 'listen' },
    { file: 'man-nod-camera',            who: 'Man',                  act: 'Nodding at camera',   tag: 'talk'   },
    { file: 'man-nod-office',            who: 'Man',                  act: 'Nodding in office',   tag: 'talk'   },
    { file: 'man-speaking',              who: 'Man',                  act: 'Speaking in meeting', tag: 'talk'   },
    { file: 'man-watching-intent',       who: 'Man',                  act: 'Watching intently',   tag: 'listen' },
    { file: 'man-watching-casual',       who: 'Man',                  act: 'Watching casually',   tag: 'idle'   },
    { file: 'sa-woman-listening',        who: 'South Asian woman',    act: 'Listening on webcam', tag: 'listen' },
    { file: 'woman-listening',           who: 'Woman',                act: 'Listening in meeting',tag: 'listen' },
    { file: 'woman-reacts',              who: 'Woman',                act: 'Reacting to a spin',  tag: 'react'  },
    { file: 'woman-speaking',            who: 'Woman',                act: 'Speaking in meeting', tag: 'talk'   },
    { file: 'woman-speaking-video',      who: 'Woman',                act: 'Speaking on video',   tag: 'talk'   }
  ];

  // participant id -> { talk, listen, react, extra } (values are clip slugs)
  var CAST = {
    // Natalie is the live-camera host; woman-speaking-video is her fallback loop.
    nat:      { talk: 'woman-speaking-video', listen: 'woman-listening',    react: 'woman-reacts',      extra: 'woman-speaking',      live: true },
    chris:    { talk: 'latino-man-camera',    listen: 'latino-man-lens',    react: 'latino-man-laughing',extra: 'latino-man-pen'      },
    // both stage files call her "sam", vilo calls her "samantha" — alias below.
    sam:      { talk: 'asian-woman-screen',   listen: 'asian-woman-listen-lens', react: 'asian-woman-listen-webcam', extra: 'asian-woman-pen' },
    ernie:    { talk: 'man-speaking',         listen: 'man-listening',      react: 'man-confused',      extra: 'man-nod-office'      },
    phil:     { talk: 'man-nod-camera',       listen: 'man-looking',        react: 'man-leaning',       extra: 'man-watching-casual' },
    devon:    { talk: 'aa-man-watching',      listen: 'aa-man-listening',   react: 'aa-man-coffee',     extra: 'aa-man-typing'       },
    // vilo-only extra participants
    maya:     { talk: 'woman-speaking',       listen: 'woman-listening',    react: 'woman-reacts',      extra: 'woman-speaking-video'},
    alex:     { talk: 'sa-woman-listening',   listen: 'sa-woman-listening', react: 'asian-woman-listen-webcam', extra: 'asian-woman-pen' },
    jordan:   { talk: 'man-nod-office',       listen: 'man-watching-intent',react: 'man-confused',      extra: 'latino-man-webcam'   }
  };
  CAST.samantha = CAST.sam; // vilo alias

  function url(slug) { return DIR + slug + '.mp4'; }

  // ---------------------------------------------------------------------
  // CHARACTER BACKEND (MONTE, adapted to our clips)
  // The MONTE instrument organizes clips into lanes; here each lane is a
  // Scene-06 character. Every character is tied to one actor ("who") group
  // so their own footage surfaces first, but any of the 27 loops can be
  // assigned to anyone — the director has full authority over the casting.
  // ---------------------------------------------------------------------
  var CHARACTERS = [
    { id: 'chris',  name: 'Chris',    role: 'raises onboarding',    who: 'Latino man' },
    { id: 'sam',    name: 'Samantha', role: 'remembers the 3 o’clock', who: 'Asian woman' },
    { id: 'ernie',  name: 'Ernie',    role: 'asks for ideas',       who: 'Man' },
    { id: 'phil',   name: 'Phil',     role: 'performance review',   who: 'Man' },
    { id: 'devon',  name: 'Devon',    role: 'team',                 who: 'African-American man' },
    { id: 'maya',   name: 'Maya',     role: 'team',                 who: 'Woman' },
    { id: 'alex',   name: 'Alex',     role: 'team',                 who: 'South Asian woman' },
    { id: 'jordan', name: 'Jordan',   role: 'team',                 who: 'Man' }
  ];
  var WHOS = [];
  CLIPS.forEach(function (c) { if (WHOS.indexOf(c.who) < 0) WHOS.push(c.who); });
  function clipMeta(slug) { return CLIPS.find(function (c) { return c.file === slug; }) || { file: slug, who: '', act: slug, tag: '' }; }
  function clipsForWho(who) { return CLIPS.filter(function (c) { return c.who === who; }).map(function (c) { return c.file; }); }
  // charClips(id) -> { own:[slug…], rest:[slug…] } : this character's own footage, then everything else
  function charClips(id) {
    var ch = CHARACTERS.find(function (c) { return c.id === id; });
    var all = CLIPS.map(function (c) { return c.file; });
    if (!ch) return { own: [], rest: all };
    var own = clipsForWho(ch.who);
    var rest = all.filter(function (f) { return own.indexOf(f) < 0; });
    return { own: own, rest: rest };
  }

  // Every clip in media/ carries its own recorded audio track (confirmed:
  // aac in all 27 files). Stages default new video elements to muted so
  // autoplay is never blocked, then unmute on the viewer's explicit click.
  var SPEAKER_ON  = '<svg viewBox="0 0 24 24"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z"/></svg>';
  var SPEAKER_OFF = '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';

  // ---------------------------------------------------------------------
  // Shared clip-library picker — a self-contained modal any stage can open
  // to browse all 27 loops and assign one, without duplicating markup.
  // ---------------------------------------------------------------------
  function ensurePickerDom() {
    if (document.getElementById('lsPicker')) return;
    var wrap = document.createElement('div');
    wrap.id = 'lsPicker';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;display:none;background:rgba(6,7,9,.88);backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:24px;font-family:Inter,system-ui,-apple-system,sans-serif';
    wrap.innerHTML =
      '<div style="width:min(860px,94vw);max-height:84vh;overflow:auto;background:#131418;border:1px solid #262930;border-radius:14px;padding:18px 18px 22px;box-shadow:0 24px 70px rgba(0,0,0,.55)">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
          '<div style="font-size:14px;font-weight:650;color:#eef0f3" id="lsPickerTitle">Choose a loop</div>' +
          '<div style="margin-left:auto;font-size:11px;color:#6b6f79" id="lsPickerCount"></div>' +
          '<button id="lsPickerClose" type="button" style="background:#1b1d22;border:1px solid #2c2f38;color:#9ea3ad;border-radius:7px;padding:6px 12px;font-size:12px;cursor:pointer">Close</button>' +
        '</div>' +
        '<div id="lsPickerGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:9px"></div>' +
      '</div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) { if (e.target === wrap) closePicker(); });
    wrap.querySelector('#lsPickerClose').onclick = closePicker;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePicker(); });
  }
  function closePicker() {
    var w = document.getElementById('lsPicker');
    if (w) { w.style.display = 'none'; w.querySelectorAll('video').forEach(function (v) { v.pause(); }); }
  }
  // openPicker(onPick, opts) — onPick(url, label, clip) fires when a tile is clicked.
  // opts.label: shown in the modal title ("Choose a loop for Chris · talk").
  function openPicker(onPick, opts) {
    ensurePickerDom();
    opts = opts || {};
    document.getElementById('lsPickerTitle').textContent = opts.label ? 'Choose a loop for ' + opts.label : 'Choose a loop';
    document.getElementById('lsPickerCount').textContent = CLIPS.length + ' loops';
    var grid = document.getElementById('lsPickerGrid');
    grid.innerHTML = '';
    CLIPS.forEach(function (c) {
      var cell = document.createElement('div');
      cell.style.cssText = 'position:relative;border-radius:9px;overflow:hidden;background:#000;border:1px solid #23252b;cursor:pointer;aspect-ratio:1/1';
      cell.innerHTML =
        '<video src="' + url(c.file) + '#t=0.4" muted loop playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block"></video>' +
        '<span style="position:absolute;top:6px;right:6px;font-family:ui-monospace,monospace;font-size:8.5px;text-transform:uppercase;letter-spacing:.06em;padding:2px 5px;border-radius:4px;font-weight:600;background:rgba(0,0,0,.55);color:#fff">' + c.tag + '</span>' +
        '<div style="position:absolute;inset:auto 0 0 0;padding:18px 7px 6px;background:linear-gradient(transparent,rgba(0,0,0,.88));font-size:10.5px;color:#eef0f3;line-height:1.32"><b style="display:block;font-size:10.5px">' + c.who + '</b>' + c.act + '</div>';
      var v = cell.querySelector('video');
      cell.addEventListener('mouseenter', function () { v.play().catch(function () {}); });
      cell.addEventListener('mouseleave', function () { v.pause(); });
      cell.addEventListener('click', function () {
        onPick(url(c.file), c.who + ' · ' + c.act, c);
        closePicker();
      });
      grid.appendChild(cell);
    });
    document.getElementById('lsPicker').style.display = 'flex';
  }

  window.LIVE_STAGE = {
    dir: DIR,
    clips: CLIPS,
    cast: CAST,
    characters: CHARACTERS,
    whos: WHOS,
    clipMeta: clipMeta,
    clipsForWho: clipsForWho,
    charClips: charClips,
    url: url,
    speakerOnIcon: SPEAKER_ON,
    speakerOffIcon: SPEAKER_OFF,
    openPicker: openPicker,
    closePicker: closePicker,
    // convenience: resolved {slot:url} map for a participant id, or null
    castUrls: function (id) {
      var c = CAST[id];
      if (!c) return null;
      return {
        talk:   url(c.talk),
        listen: url(c.listen),
        react:  url(c.react),
        extra:  url(c.extra)
      };
    }
  };
})();

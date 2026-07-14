# Live Room Stage
### Full Production and Program Write-Up

A browser kit that turns the physical computer used during production into a **live scene partner**. Open [`index.html`](index.html) for the tool; the builds, in order of increasing capability, are:

| # | Build | File | Use |
|---|-------|------|-----|
| 01 | Simple Shoot Build | [`room-simple.html`](room-simple.html) | One-click, self-contained. Pick 1/2/4/9, press start, walk away. |
| 02 | Auto Scene 06 | [`auto-scene/index.html`](auto-scene/index.html) | Self-driving six-beat scene. |
| 03 | Director Stage | [`zoom-stage.html`](zoom-stage.html) | Live host + six coworkers, talk/listen/react/extra per person. |
| 04 | Scene 06 · Collision | [`zoom-scene6.html`](zoom-scene6.html) | The two-meetings-collide beat, clip gallery + phone pairing. |
| 05 | Full Scripted Stage | [`vilo-stage.html`](vilo-stage.html) | Complete cue-by-cue performance, up to nine tiles, speech + motion reactive. |

All coworker plates live in [`media/`](media/) and are declared once in [`clips.js`](clips.js). The shoot launch scripts and on-set read-me are in [`shoot/`](shoot/).

---

## 1. Initial Interpretation

The Live Room Stage turns the physical computer used during production into a live scene partner. It is not a prerecorded video placed on a monitor. It is not merely a graphical imitation of a video call. It is a real-time browser application in which:

- The actual actress playing Nat appears through the computer's real webcam.
- The computer receives her real microphone input.
- Scripted coworkers speak to her and react around her.
- Her physical movement can advance the scene.
- Recognized dialogue can trigger the next response.
- A local AI model can optionally generate unscripted replies.
- The visible meeting can be recorded directly from the computer.
- All production controls disappear during the photographed take.

The system therefore joins two performance spaces:

```
<physical room on set>
        +
<live meeting room inside the computer>
        =
<one continuous performance environment>
```

The actress is not acting against a blank screen or guessing where responses will occur. She can hear Chris, Samantha, Ernie, and Phil, see their reactions, time her responses to them, and interact with the actual computer that appears in the finished film.

The essential proposition is:

> The prop computer should not display the performance. The prop computer should participate in the performance.

## 2. Theory Skeleton

The live room is organized around six connected systems.

```
<Actress Capture>
        ↓
<Live Nat Tile>
        ↓
<Scene Cue Engine>
        ↔
<Remote Cast Engine>
        ↓
<Meeting Interface>
        ↓
<Production Camera + Screen Recorder>
```

A second sensing path lets Nat influence the meeting:

```
<voice or movement from actress>
        ↓
[recognize]
        ↓
<scene event>
        ↓
[coworkers react]
```

The complete system contains:

```
{
  <live actress>,
  <meeting room>,
  <remote cast>,
  <scripted timeline>,
  <reactive input>,
  <hidden director controls>,
  <capture system>
}
```

### The three operating modes

The program does not depend on only one kind of performance logic. It supports three increasingly open modes.

**Mode 1 — Script-Locked Stage.** The screen operator advances the scene cue by cue.

```
operator presses Space
        ↓
next scripted actor speaks
        ↓
correct reactions occur
        ↓
scene remains repeatable
```

This is the principal production mode because it protects continuity, timing, dialogue accuracy, and editorial coverage.

**Mode 2 — Actress-Responsive Stage.** The browser listens for Nat's lines and watches her movement.

```
Nat says: "I can do it. Samantha can help me."
        ↓
system recognizes key phrase
        ↓
Samantha's next cue becomes active
```

The coworkers can also notice when Nat begins moving or turning in her chair. This gives the actress a more natural feeling of conversational causality without surrendering the scripted scene.

**Mode 3 — Generative Rehearsal.** Nat's speech can be sent to a local AI model. The AI replies as the most relevant coworker.

```
Nat speaks freely
        ↓
local AI receives dialogue and role context
        ↓
Chris, Samantha, Ernie, or Phil generates a short reply
        ↓
reply is spoken and shown in the meeting
```

This mode is useful for rehearsal, improvisation, alternate takes, and discovering more natural timing. It should not be the default for critical continuity takes because generated wording and response duration can vary.

## 3. Assumption Ledger

**"Real Zoom" means real performance behavior.** The stage reproduces the behavior expected from an actual video-conferencing application: real webcam input, real microphone input, live participant composition, speaking indicators, meeting duration, mute and camera controls, incoming-call notification, participant reactions, fullscreen meeting display, screen capture, live dialogue response. It uses a fictional Vilo meeting identity rather than depending on Zoom's network service or copying Zoom branding exactly. This provides production control while still reading immediately as a professional video meeting.

**The actress occupies Nat's tile.** Nat is always a genuine video source whenever camera permission is granted. The same live stream can appear as a large single-person image, in the four-person team meeting, in a nine-person meeting, beside Phil during the performance review, as a small self-view, and inside the meeting-collision sequence. Nat is not rendered separately for each layout — her one live camera stream is recomposed across layouts.

**The visible computer is the production computer.** The application is intended to run on the actual computer photographed in the scene. It can also make an internal screen recording, but the principal image may still be captured by the cinema camera looking at the monitor. This produces both a screen photographed in the room and a clean internal screen recording for editorial or replacement.

**Browser security remains active.** A browser will not silently activate a camera, microphone, or screen recorder. Permission must be granted through the browser's system prompt. The production can prepare these permissions before the camera rolls, but the application cannot and should not bypass them.

**Reliability outranks unlimited improvisation.** The system makes AI available without making the shoot dependent on AI. The invariant is: a failure of speech recognition or AI must not prevent manual completion of the scene. Every important beat remains accessible through a direct cue button and the Space key.

## 4. Operational Description

### 4.1 The visible meeting room

When production controls are hidden, the computer displays only the meeting environment: a dark professional meeting frame, the title *Vilo Product Team — Scene 06*, a running meeting timer, participant names, camera tiles, active-speaker borders, familiar mute / video / participants / chat / share / record / reactions / end controls, incoming-meeting alerts, optional dialogue captions, the first-call/second-call collision, Nat's live webcam, and the Monster riding the Roomba in Nat's background.

The interface is credible enough to function as the on-camera screen itself. It does not require a separate screen replacement merely to become legible.

### 4.2 Participant layouts

The director can select any count from one through nine.

| Heads | Composition | Primary production use |
|------|-------------|------------------------|
| 1 | One full-frame participant | Phil insert, Nat insert, active speaker |
| 2 | Equal two-person division | Nat and Phil review |
| 3 | One large participant with two stacked | Transitional meeting coverage |
| 4 | Two-by-two grid | Main team meeting |
| 5–6 | Three-by-two arrangement | Expanded team B-roll |
| 7–9 | Three-by-three arrangement | Large meeting establishing shot |

Core cast identities remain stable as the number changes. The primary four-person team is Chris, Samantha, Ernie, Nat. The two-person review is Phil, Nat. The nine-person meeting adds Maya, Devon, Alex, Jordan, and an additional participant without removing the core team.

### 4.3 Shot presets

- **TEAM — 4** — the principal scripted meeting: Chris, Samantha, Ernie, Nat.
- **TEAM — 9** — a wider coworker meeting for over-the-shoulder and screen B-roll.
- **REVIEW — 2** — Nat and Phil during the performance review.
- **PHIL — 1** — a clean full-screen Phil pickup.
- **NAT — 1** — a clean live Nat webcam pickup.
- **COLLISION** — the original team call remains visible while the performance-review window opens and Nat's first-call image glitches.

### 4.4 Remote participant appearances

The included remote coworkers are procedural stand-ins with distinct skin tones, hair forms and colors, clothing, room backgrounds, independent blinking, speaking mouth movement, and nodding / shaking / laughing / confused reactions, plus stable names and roles.

They can be replaced with local media files — an image or looping video for any coworker. The media remains on the production computer; it is not uploaded. This creates a practical production ladder:

```
procedural stand-ins
        ↓
approved portraits
        ↓
looping filmed plates
        ↓
fully produced remote-character performances
```

The live system remains the same while the visual fidelity can increase later. In this repository, the looping-filmed-plate stage is already wired: the 27 clips in `media/` are assigned to the cast through `clips.js`.

## 5. Performance and Cue Design

### 5.1 The Scene 06 cue sequence

| Cue | Meeting state | Action |
|-----|---------------|--------|
| 1 | Team — 4 | The meeting settles |
| 2 | Team — 4 | Chris raises the onboarding problem |
| 3 | Team — 4 | Nat volunteers and includes Samantha |
| 4 | Team — 4 | Samantha remembers the 3 o'clock meeting |
| 5 | Team — 4 | Ernie asks for another solution |
| 6 | Team — 4 | Nat begins explaining her two-part plan |
| 7 | Team — 4 | Chris notices Nat moving |
| 8 | Team — 4 | Samantha announces that Nat is spinning |
| 9 | Team — 4 | Nat returns and asks whether they heard her |
| 10 | Team — 4 | The group asks her to repeat herself |
| 11 | Team — 4 | The performance-review alert appears |
| 12 | Collision | Phil enters while Nat glitches in the first call |
| 13 | Review — 2 | Phil begins the performance review |
| 14 | Review — 2 | Monster rides the Roomba behind Nat |
| 15 | Phil — 1 | Clean Phil dialogue pickup |
| 16 | Nat — 1 | Clean Nat "Perfect timing" pickup |

Each cue defines visible participants, active speaker, dialogue, reactions, screen overlays, duration, and transition target.

### 5.2 Scripted coworker voices

When a cue begins, the remote character can speak through the computer using the browser's available system voices, varying rate, pitch, voice selection, speaker identity, active-speaker border, and mouth movement. The generated system voice is not necessarily the final film dialogue; it gives the actress real timing and eyelines, creates a playable rehearsal partner, and provides usable scratch dialogue for editorial synchronization. Final remote dialogue can later be replaced with recorded actors while preserving the timing established on set.

### 5.3 Actress speech recognition

Speech recognition is optional. When enabled, the program listens for specific semantic anchors rather than requiring perfect transcription:

- "I can do it" / "Samantha can help" → advance toward Samantha's concern
- "three o'clock" / "client meeting" → advance toward Ernie's problem
- "split it into two parts" / "first part" → coworkers begin noticing Nat's movement
- "Did you guys hear me?" → group asks her to repeat herself
- "Good morning, Phil" / "Perfect timing" → performance-review state

The recognition system is intentionally forgiving. Support varies by browser and may use a vendor's online speech service, so it should be treated as an enhancement rather than the only trigger path.

### 5.4 Motion-reactive coworkers

The stage watches a low-resolution version of Nat's webcam feed. Every few fractions of a second it converts the frame to grayscale, compares it with the previous frame, calculates an average movement score, and tests that score against cue-specific thresholds. During *Nat begins her plan*, significant movement can trigger Chris: "Natalie?"; continued or larger movement can trigger Samantha: "Honey, you're spinning!"

The system does not understand "chair rotation" as a concept — it detects visible change across Nat's camera image, which is sufficient to create the causal impression that her coworkers noticed her turn. Lighting changes or someone crossing behind Nat may also register; the director can disable motion reactions instantly and advance the cues manually.

### 5.5 The Monster in the live camera tile

The Monster/Roomba event is a composited layer inside Nat's tile. During the review cue: Phil speaking + Nat's real webcam + Monster riding Roomba behind Nat. The actress can see the event on her own screen and react to its timing, without the Monster existing physically behind her. For greater realism, the procedural Monster can later be replaced with a rendered animation plate while preserving the same cue and travel path.

## 6. Hidden Director System

The application contains two interfaces on the same screen: **Interface A**, the fictional meeting visible in the film, and **Interface B**, the hidden director panel. Pressing `D` reveals the panel; pressing `D` again hides it.

The panel controls shot presets, number of heads, one-head focus, camera selection and mirroring, Nat's office guide overlay, motion response, cue selection and playback, speech recognition, remote voices, automatic cue advancement, optional local AI, participant image/video replacement, screen recording, fullscreen, clean-feed mode, and captions.

**Clean feed** removes the meeting toolbar, director panel, captions, recording indicators, production status, and unnecessary spacing; the meeting expands to the full display. Pressing `Escape` restores control. **Automatic hiding**: when the mouse and keyboard remain idle, the visible meeting controls fade away so the toolbar never lingers during a photographed take; moving the mouse restores them.

### Keyboard controls

| Key | Operation |
|-----|-----------|
| `D` | Open or close director controls |
| `1`–`9` | Change visible participant count |
| `Space` | Advance to next cue |
| `C` | Start or stop Nat's camera |
| `H` | Hide or restore meeting chrome |
| `F` | Enter or leave fullscreen |
| `R` | Start or stop screen recording |
| `Esc` | Leave clean-feed mode |

A wireless keyboard, small Bluetooth keypad, or assistant positioned just outside frame can operate the entire stage. The actress does not need to reach for production controls during the take.

## 7. Failure Playbook

- **Camera permission prompt appears during the take** — permission was not granted in setup. Open the stage, Join with camera, and grant camera and microphone access before lighting and camera rehearsal. The prompt cannot be cosmetically hidden.
- **The actress hears no coworkers** — computer or tab muted, voices not loaded, wrong audio device, or remote voices disabled. Fallback: a screen operator advances visual cues while an off-camera reader performs the remote lines.
- **Recognition advances at the wrong moment** — the browser misheard an overlapping phrase. Disable auto-advance and operate with `Space`. Script-locked mode always remains available.
- **Movement triggers too early** — a large gesture, lighting change, or someone crossing the webcam background. Disable motion-reactive coworkers and trigger *Coworkers notice the spin* manually.
- **AI replies are slow or inconsistent** — the local model is loading or unavailable. Return to scripted dialogue immediately. The scene must never wait for an AI response during a critical take.
- **The meeting appears visually synthetic** — procedural characters are still in use for final close coverage. Load approved portraits, prerecorded talking-head loops, or remote actor plates. Procedural characters are best for blocking, timing, over-the-shoulder material, and preliminary pickups.
- **Screen recording contains director controls** — the panel was open. Enter clean feed before the take and share the application tab rather than the entire desktop when practical.
- **Screen audio missing from the recording** — capture differs across browsers/OSes; tab capture is usually most consistent. Record Nat's dialogue through the sound department regardless — the internal recording is a visual/sync asset, not the sound master.
- **Monitor flicker or rolling bars in the cinema camera** — a physical camera/display sync problem, not an application error. Check display refresh rate, camera shutter angle and frame rate, brightness modulation, variable-refresh features, and exposure. A 60 Hz display and 23.976 fps camera often need shutter testing. Do not discover banding on the hero take.

## 8. Change Test

The architecture should survive production changes without a new program:

- **Six people instead of four** — the head-count control recomposes while retaining Nat and the principal cast.
- **Phil only** — select PHIL — 1.
- **The actress is replaced** — no logic changes; the new performer enters through the same webcam stream.
- **Real coworker actors become available** — record each against a suitable background and load the loops into the matching participant slots.
- **The dialogue is rewritten** — update cue data without touching camera, recording, layout, or control systems.
- **Nat's chair spin is removed** — disable motion response and skip from her plan to the notification.
- **The Monster animation is replaced** — swap only the Monster media layer; the review cue and live camera remain intact.
- **Unscripted improvisation** — enable a local AI endpoint and generative replies for rehearsal or selected takes.
- **No internet** — the main stage still functions: camera capture, scripted cues, layouts, uploaded local media, motion detection, and screen recording need no cloud. Only speech recognition may be unavailable; the manual cue system is unaffected.
- **Filmed without visible toolbars** — use clean feed or hide chrome; the scene can occupy the entire physical screen.

## 9. Implementation and Day-of-Shoot Plan

### 9.1 Computer preparation

Place the files in a dedicated folder on the hero computer and run a local server:

```
cd live-stage
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Using localhost gives camera, microphone, and screen-capture APIs a reliable secure context.

Disable before the shoot: automatic OS updates, browser update prompts, notification banners, incoming calls and messages, sleep mode, screen saver, automatic display dimming, battery-saving display changes, and unnecessary extensions. Disable variable-refresh behavior if it causes camera artifacts. Use a fresh browser profile when possible.

### 9.2 Camera and microphone

Join with camera; grant camera and microphone permission. In the director panel, select the intended camera. The application requests roughly 1920×1080, 30 fps preferred (up to 60 fps when available); the final stream still depends on the webcam and browser. Decide whether Nat's image should be mirrored — mirroring helps the actress because the screen behaves like a mirror, but it reverses visible writing or intentional directional action. The mirror setting affects only the displayed preview, not the physical feed.

### 9.3 Audio routing

- **A — Computer speakers.** Authentic call audio in the room, but the sound department must manage echo and playback contamination.
- **B — Actress headphones.** Ideal once she enters the performance review; reduces feedback.
- **C — Concealed earpiece.** Maximum control, visually clean screen, but may feel less connected to the computer.

For the final edit, record Nat cleanly and treat the remote voices as guide tracks unless their quality is approved.

### 9.4 Screen preparation

Set a stable display brightness (avoid maximum unless required for exposure). Test reflections from set lighting, webcam exposure, moiré, monitor flicker, legibility of faces and names, black levels, and whether the cinema camera can hold both Nat and the screen. Use the four-person grid for the clearest team coverage; reserve the nine-person grid for wider over-the-shoulder inserts.

### 9.5 Rehearsal procedure

Start in TEAM — 4 with remote voices on and recognition/motion off. Rehearse once using only `Space`; establish the actress's natural pauses. Enable motion response and rehearse the chair turn to find the movement that crosses the threshold. Enable speech recognition only after the manual rhythm works. Rehearse the collision and the Monster glance separately. Test clean feed. Make a short internal recording and review it. This moves from most controlled to most reactive.

### 9.6 Recommended take strategy

- **Group A — monitor inserts.** Four-person call, nine-person meeting, Phil single, Nat single, Nat/Phil split, incoming-call notification, collision, Monster/Roomba pass. Captured without running the full dramatic scene.
- **Group B — actress performance.** Script-locked; the operator advances each cue based on the actress rather than automatic timing.
- **Group C — reactive performance.** Enable voice and motion triggers for a more organic take.
- **Group D — improvisational.** Use local AI only after all essential scripted coverage exists.

### 9.7 Reset between takes

Before each take: preset TEAM — 4, cue *Meeting established*, camera on, microphone set, motion set, recognition set, remote voices on, captions per production decision, recording confirmed, clean feed active. The operator calls: "Stage reset." / "Camera live." / "Cue one ready." / "Screen clean." Then roll the physical camera.

## 10. Production Contract

The Live Room Stage succeeds when it provides all of the following simultaneously:

- Nat is the real actress captured through the real on-set computer.
- She can see and hear the meeting she is performing within.
- The computer screen remains photographable as a finished visual asset.
- Coworkers respond according to the screenplay.
- The meeting can be recomposed from one to nine visible heads.
- The main four-person cast remains spatially and narratively stable.
- The chair-spin joke occurs inside Nat's actual live tile.
- The second meeting collides with the first meeting visibly.
- Phil's review and the Monster/Roomba event can play around Nat in real time.
- Every automatic behavior has a manual fallback.
- All production controls can disappear instantly.
- The computer can record a clean version of its own screen.
- The scene remains functional without cloud services.
- Optional AI expands performance without becoming a point of failure.
- The actress experiences the computer as another actor rather than a passive prop.

The deeper design principle is:

> The live room does not simulate that Nat is trapped inside a chaotic meeting. It creates a controlled form of that chaotic meeting around the actress, on the real computer, during the real take.

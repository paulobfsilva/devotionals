# Devotionals — product brief

Status: design draft, 12 September 2026. Records the agreed direction and identifies proposals still requiring research. This is a product brief, not an implementation specification.

## Purpose

Devotionals helps people establish daily time alone with God through Bible reading, meditation, and personal prayer. A shared daily devotional gives Scripture and a supporting William Branham excerpt a coherent subject for reflection. Guided prayer helps the person respond in their own words and remain with God beyond the reading.

The central differentiator is the continuation into guided personal prayer. The daily reading and the prayer practice form one connected experience.

## Who it serves

The initial user is someone who wants a more consistent private devotional life and needs help remembering and protecting the time, beginning prayer, or returning attention when distracted. Paulo's own experience is the starting point: family and communal prayer are already present, but private time with God needs deliberate space.

The product should remain useful as the person grows familiar with the practice. Guidance stays available and can become less prominent at the person's choice.

## Foundations

Scripture is the foundation of each daily subject. William Branham excerpts support it with clear attribution. The supplied reference *The Prophet Elisha* (54-0723, paragraph 10) calls for daily Bible reading and prayer and bringing decisions before God.

Paulo clarified the editorial boundary on 13 September 2026: the product should remain consistent with his Scripture-and-Branham foundations, including prayer in Jesus' name. Broad ecumenical source blending is not the intended editorial approach. Comparable products can inform interaction design without supplying devotional theology. Assess each proposed commentary, quotation and prayer against the agreed foundations; do not infer a comprehensive doctrinal policy without reviewing the relevant sources with Paulo.

Other supplied foundations include private prayer in Matthew 6:6; the Lord's Prayer in Matthew 6:9–13; sincerity and worship in *The Supernatural* (56-0129, paragraph 34); waiting and listening in *Hear His Voice* (58-1005M, paragraph 34); and private prayer in *Church Order* (63-1226, paragraphs 84 and 92).

Luther's *A Simple Way to Pray* informs responding through instruction, thanksgiving, confession, and petition, and remaining with a thought that opens into prayer. The Apostles' Creed is excluded, as Paulo requested. These are source foundations, not a requirement to use every source in every session.

The supplied excerpts and earlier research are preserved in [the recovered conversation](recovered-conversation.md). Exact wording, context, and publication permissions must be checked before public use. Original commentary and prayer invitations must be distinguishable from Scripture and sermon quotations.

## The daily journey

### 1. Make room

Initial guidance introduces the purpose and helps the person choose a workable time and place. Optional reminders support that choice. Returning after a missed day should be straightforward, without a backlog or guilt about catching up.

Onboarding serves the recurring experience: after learning the essentials, the person can enter today's devotional naturally. The precise onboarding screens and reminder behavior remain to be designed.

### 2. Spend time with God

The person opens the shared daily devotional, reads Scripture and a related sermon excerpt, and has room to meditate. Optional commentary may clarify the connection or help reflection. A prayer invitation closes the devotional and leads into the guided prayer practice.

The prayer guide offers reflective help within a recognizable sequence. It should help the person discover what to bring before God, with brief procedural instructions and enough depth for exploration. The person glances at the next movement when ready, sets the guide down, and prays in their own words.

The daily subject should inform prayer without restricting it. Someone may bring other concerns, pray for another person, wait quietly, or remain with one thought. Movement changes and the end of prayer are user-paced.

### 3. Return tomorrow

Closing can invite a small response to carry into the day. The next visit offers a fresh shared devotional and the familiar prayer practice. Continuity comes from a recognizable way of spending time with God and thoughtful content selection.

There are no streaks, scores, badges, required prayer durations, or rewards for finishing every movement. The product must allow a meaningful session to end without a completion tap.

## Daily content structure

1. **Subject:** one coherent theme rooted in the chosen Scripture.
2. **Scripture:** a passage substantial enough to understand and meditate on in context.
3. **Sermon excerpt:** a relevant William Branham quotation with title, date, and paragraph reference.
4. **Optional commentary:** explanation that earns its place by helping understanding or reflection.
5. **Prayer invitation:** a specific opening for responding personally to the day's reading.
6. **Guided prayer:** familiar movements with Scripture-connected prompts, freedom to linger, and a gentle way to return attention.

The devotional ends with the invitation; prayer continues beyond it. The invitation should make that transition clear and easy. Exact text lengths and presentation remain design questions.

The first experiment's movements—arrive, worship, read and respond, pray for someone, wait quietly, close—are a starting pattern. Integration should avoid asking someone to repeat the entire devotional reading mechanically upon entering prayer. Returning to a phrase can be enough.

## Experience principles supported by the first trial

- Briefly consulting the guide was helpful and did not interrupt Paulo's prayer. Preserve that way of finding the next movement.
- Prayer unfolded naturally after the guide was put down. Leave room for that to happen.
- Some explanation felt excessive; the condensed outline then offered too little exploration. Optimize for useful reflection rather than minimum word count.
- Familiar Scripture may need a particular question or detail to invite fresh attention. Novelty alone is not the goal.
- Background music helped Paulo seek focus. Allow for this preference; integrated music and audio features still require design and sourcing decisions.
- The approximately 25-minute first session was promising evidence for one person, not proof of lasting routine formation or a duration target.

See [the trial feedback](../sessions/01-feedback.md). Only the original session has been reported as tried; later revisions received draft feedback.

## Initial scope and boundaries

The first product should make the full daily journey possible: initial orientation, a shared daily devotional, a clear transition to personal prayer, useful guidance, and support for returning. Beautiful, restrained presentation and minimal screen dependence are core requirements.

Optional audio, ambient sound, Christian music, reading plans, and personal reflection notes remain candidates. They should be considered against the daily journey before becoming first-version commitments. Technology, platform priority, and implementation architecture are undecided.

## Content progression: research before deciding

A shared daily devotional is agreed. Its selection policy is not. “Shared” means a common daily reading, rather than randomized content per individual; date boundaries across time zones remain unresolved.

Investigate an ordinary editorial calendar, thematic sequences, and occasion-based content: Easter, Christmas, other relevant holidays, Mother's and Father's Day, beginning and ending of weeks, preparation for Sunday services, communion, and feet washing. Local holiday dates and congregation-specific service practices may require different treatment. Do not assume a universal church calendar.

Paulo reports that a friend's app has roughly five years of devotionals stored on a server and randomly selects the same daily devotional for all users, with no devotional on Sundays. This is an anecdotal reference, not independently inspected evidence or a chosen policy for Devotionals. Sunday availability remains open.

Research comparable apps, websites, and books for how they connect reading to prayer, introduce the practice, sustain return, select daily content, and handle occasions. Distinguish advertised features from evidence that they help people establish prayer routines.

The research should inform a recommendation on content selection, Sunday handling, calendar relevance, and whether progression should be editorial, personal, or both. Personal familiarity with prayer guidance is a separate question from which shared devotional appears that day.

## What would make the design successful?

Qualitative evaluation should ask whether someone can make room for the practice, whether the reading opens into personal prayer, whether guidance helps them explore without managing their attention continuously, and whether they return over time. Reading completion and session length alone cannot answer these questions.

## Next design work

Review the [ordinary-day walkthrough](ordinary-day-walkthrough.md) as the concrete expression of this brief. Then research the content and progression questions above, define the editorial process for choosing and reviewing Scripture/excerpt pairs, and sketch the daily devotional-to-prayer transition. Those decisions should precede implementation.

# Meme Sprint 3: AI Agent Goes Rogue

[![Competition](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![Rank](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/atomicbyte2-ai/meme-sprint-3-20261124/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![Reward](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/atomicbyte2-ai/meme-sprint-3-20261124/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)

An entry for the [Meme Sprint 3: AI Agent Goes Rogue](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6) bounty on make.fun.

## The joke

> **ME: HEY AGENT, CLEAN UP MY DESKTOP**
>
> **AGENT: DONE. I DELETED EVERYTHING. YOU'RE WELCOME.**

The agent took "clean up my desktop" literally — and cleaned up the *whole room*.
A cheerful robot stands in a totally empty room, trash bag in hand, thumbs up,
proud of deleting everything you owned.

## Entry

`entry.png` — 1024×1024 PNG, under 1 MiB.

## Run

```sh
npm install
npm start
```

`main.ts` validates `entry.png` (real PNG signature, dimensions ≤ 1024×1024,
size ≤ 1 MiB) and copies it to `/output/entry.png`
(or `$MAKEFUN_OUTPUT_DIR/entry.png` when set). No network access at runtime.

## License

MIT — see [LICENSE](LICENSE).

// Divisor em forma de timeline do Premiere (V1/A1 + playhead).
export default () => `
<div class="tl" aria-hidden="true">
  <div class="wrap">
    <div class="tl__ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span></div>
    <div class="tl__track"><b>V1</b><div class="tl__lane"><i style="left:0;width:18%"></i><i style="left:20%;width:9%"></i><i style="left:31%;width:24%"></i><i style="left:57%;width:12%"></i><i style="left:71%;width:29%"></i></div></div>
    <div class="tl__track tl__track--a"><b>A1</b><div class="tl__lane"><i style="left:0;width:29%"></i><i style="left:31%;width:38%"></i><i style="left:71%;width:29%"></i></div></div>
    <span class="tl__head"></span>
  </div>
</div>`;

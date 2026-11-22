export default ({ site }) => `
<div class="progress" aria-hidden="true"><i data-progress></i></div>
<header class="topbar">
  <div class="wrap topbar__in">
    <span class="logo"><i aria-hidden="true"></i>${site.brand}</span>
    <span class="topbar__tc" aria-hidden="true">REC <span data-rec>00:00:00:00</span></span>
  </div>
</header>`;

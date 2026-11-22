export default ({ c }) => `
<section class="sec" id="garantia">
  <div class="wrap guar">
    <div class="guar__seal" aria-hidden="true"><span>7</span><small>DIAS</small></div>
    <div><h2>${c.guarantee.title.replace('7 dias', '<span class="grad">7 dias</span>')}</h2><p class="lead">${c.guarantee.text}</p></div>
  </div>
</section>`;

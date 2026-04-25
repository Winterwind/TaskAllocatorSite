document.addEventListener('DOMContentLoaded', function () {
  // Tab switching for any [data-tab-group] container
  document.querySelectorAll('[data-tab-group]').forEach(function (group) {
    const groupId = group.dataset.tabGroup;
    const tabs = group.querySelectorAll('[data-tab]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.dataset.tab;

        // Deactivate all tabs in this group
        tabs.forEach(function (t) { t.classList.remove('active'); });
        // Deactivate all panels for this group
        document.querySelectorAll('[data-tab-panel="' + groupId + '"]').forEach(function (p) {
          p.classList.remove('active');
        });

        // Activate clicked tab and matching panel
        tab.classList.add('active');
        const panel = document.querySelector(
          '[data-tab-panel="' + groupId + '"][data-panel="' + target + '"]'
        );
        if (panel) panel.classList.add('active');
      });
    });
  });

  // Activity heatmap — fills .heatmap-grid using real contribution counts
  document.querySelectorAll('.heatmap-grid').forEach(function (grid) {
    let counts = null;
    try { counts = JSON.parse(grid.dataset.heatmap || 'null'); } catch (e) { /* ignore */ }

    // Level thresholds: 0=none, 1=light … 4=dark
    function countToLevel(n) {
      if (n <= 0) return 0;
      if (n === 1) return 1;
      if (n === 2) return 2;
      if (n <= 4)  return 3;
      return 4;
    }

    const data = (Array.isArray(counts) && counts.length === 364) ? counts : null;

    for (let i = 0; i < 364; i++) {
      const cell = document.createElement('div');
      const lvl = data ? countToLevel(data[i]) : 0;
      cell.className = 'heatmap-cell' + (lvl > 0 ? ' h' + lvl : '');
      if (data) {
        const n = data[i];
        cell.title = n > 0
          ? n + ' contribution' + (n !== 1 ? 's' : '')
          : 'No contributions';
      }
      grid.appendChild(cell);
    }
  });
});

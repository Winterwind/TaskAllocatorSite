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

  // Avatar dropdown menu
  const avatarTrigger  = document.getElementById('avatar-trigger');
  const avatarDropdown = document.getElementById('avatar-dropdown');

  if (avatarTrigger && avatarDropdown) {
    avatarTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = avatarDropdown.classList.toggle('open');
      avatarTrigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function () {
      if (avatarDropdown.classList.contains('open')) {
        avatarDropdown.classList.remove('open');
        avatarTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // List filtering — wires up .filter-group[data-filter-target] buttons
  document.querySelectorAll('.filter-group[data-filter-target]').forEach(function (group) {
    const panel = group.closest('.tab-panel');
    const list  = (panel || document).querySelector(group.dataset.filterTarget);
    if (!list) return;

    group.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        list.querySelectorAll('[data-status]').forEach(function (item) {
          item.style.display = (filter === 'all' || item.dataset.status === filter) ? '' : 'none';
        });
      });
    });
  });

  // Activity heatmap — fills .heatmap-grid using real contribution counts
  const heatTip = document.createElement('div');
  heatTip.className = 'heatmap-tooltip';
  document.body.appendChild(heatTip);

  document.querySelectorAll('.heatmap-grid').forEach(function (grid) {
    let counts = null;
    try { counts = JSON.parse(grid.dataset.heatmap || 'null'); } catch (e) { /* ignore */ }

    function countToLevel(n) {
      if (n <= 0) return 0;
      if (n === 1) return 1;
      if (n === 2) return 2;
      if (n <= 4)  return 3;
      return 4;
    }

    const data = (Array.isArray(counts) && counts.length === 364) ? counts : null;

    // Build UTC date strings for each cell (oldest → newest, matching server array)
    const cellDates = [];
    const ref = new Date();
    for (let i = 363; i >= 0; i--) {
      const d = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate() - i));
      cellDates.push(d.toISOString().slice(0, 10));
    }

    for (let i = 0; i < 364; i++) {
      const cell = document.createElement('div');
      const n = data ? (data[i] || 0) : 0;
      cell.className = 'heatmap-cell' + (countToLevel(n) > 0 ? ' h' + countToLevel(n) : '');
      cell.dataset.date  = cellDates[i];
      cell.dataset.count = String(n);
      grid.appendChild(cell);
    }

    // Show custom tooltip on cell hover
    grid.addEventListener('mouseover', function (e) {
      const cell = e.target.closest('.heatmap-cell');
      if (!cell) return;

      const n = parseInt(cell.dataset.count || '0', 10);
      const dateStr = cell.dataset.date || '';
      let label = dateStr;
      try {
        const [yr, mo, dy] = dateStr.split('-').map(Number);
        label = new Date(yr, mo - 1, dy).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        });
      } catch (ex) { /* ignore */ }

      heatTip.textContent = n > 0
        ? n + ' contribution' + (n !== 1 ? 's' : '') + ' on ' + label
        : 'No contributions on ' + label;

      const rect = cell.getBoundingClientRect();
      let top = rect.top - 30;
      if (top < 4) top = rect.bottom + 6;
      heatTip.style.left = (rect.left + rect.width / 2) + 'px';
      heatTip.style.top  = top + 'px';
      heatTip.style.opacity = '1';
    });

    grid.addEventListener('mouseleave', function () {
      heatTip.style.opacity = '0';
    });
  });
});

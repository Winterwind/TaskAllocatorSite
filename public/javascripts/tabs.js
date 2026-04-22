document.addEventListener('DOMContentLoaded', function () {
  // Tab switching for any [data-tab-group] container
  document.querySelectorAll('[data-tab-group]').forEach(function (group) {
    var groupId = group.dataset.tabGroup;
    var tabs = group.querySelectorAll('[data-tab]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.tab;

        // Deactivate all tabs in this group
        tabs.forEach(function (t) { t.classList.remove('active'); });
        // Deactivate all panels for this group
        document.querySelectorAll('[data-tab-panel="' + groupId + '"]').forEach(function (p) {
          p.classList.remove('active');
        });

        // Activate clicked tab and matching panel
        tab.classList.add('active');
        var panel = document.querySelector(
          '[data-tab-panel="' + groupId + '"][data-panel="' + target + '"]'
        );
        if (panel) panel.classList.add('active');
      });
    });
  });

  // Heatmap generator — fills any .heatmap-grid element with placeholder cells
  document.querySelectorAll('.heatmap-grid').forEach(function (grid) {
    var levels = [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 4]; // weighted toward empty
    for (var i = 0; i < 364; i++) {
      var cell = document.createElement('div');
      var lvl = levels[Math.floor(Math.random() * levels.length)];
      cell.className = 'heatmap-cell' + (lvl > 0 ? ' h' + lvl : '');
      grid.appendChild(cell);
    }
  });
});

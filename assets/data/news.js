/*
  News items for cjpurackal.com
  - Add new items to the TOP of the array (newest first).
  - Each item has:
      - date: short string like 'Nov 2026' or '2026' if month unknown
      - html: one-line update; plain text or safe inline HTML (e.g., <a>)
  This file is loaded by the homepage and News page to render the list.
*/

window.newsItems = [
  {
    date: 'Nov 2026',
    html:
      'Runner-up, Young Person of the Year at the OpenUK Awards 2026, held at the House of Commons, London (5 Nov 2026). ' +
      '<a href="https://openuk.uk">OpenUK</a>'
  },
  {
    // TODO: Replace '2026' with the exact month when known (e.g., 'Mar 2026').
    date: '2026',
    html: 'Joined OpenUK as a Rising Ambassador.'
  }
];


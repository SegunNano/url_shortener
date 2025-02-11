const toggleButton = document.querySelector('[data-drawer-toggle="default-sidebar"]');
const sidebar = document.getElementById('default-sidebar');
console.log(toggleButton.children);

console.log(document);
toggleButton.addEventListener('click', (e) => {
    sidebar.classList.remove('-translate-x-full');
});
for (i of toggleButton.children) i.addEventListener('click', (e) => {
    sidebar.classList.remove('-translate-x-full');
});


document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (
            !sidebar.classList.contains('-translate-x-full') && // Sidebar is open
            !sidebar.contains(e.target) && // Click is outside the sidebar
            e.target !== toggleButton && // Click is not on the toggle button
            e.target !== toggleButton.children[0] && // Click is not on the toggle button
            e.target !== toggleButton.children[1]// Click is not on the toggle button
        ) sidebar.classList.add('-translate-x-full');

    });
});
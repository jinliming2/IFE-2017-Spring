/**
 * Created by Liming on 2017/2/28.
 */
"use strict";
(() => {
    document.body.addEventListener('contextmenu', (e) => {
        if(e.target.dataset.menu) {
            let menu = document.createElement('div');
            menu.classList.add('context-menu');
            menu.setAttribute('tabindex', 0);
            menu.innerHTML = document.getElementById(e.target.dataset.menu).innerHTML;
            document.body.appendChild(menu);
            let height = parseFloat(menu.currentStyle ? menu.currentStyle.getAttribute('height') : getComputedStyle(menu, null).getPropertyValue('height'));
            let width = parseFloat(menu.currentStyle ? menu.currentStyle.getAttribute('width') : getComputedStyle(menu, null).getPropertyValue('width'));
            let left = e.clientX;
            let top = e.clientY;
            left + width > innerWidth && (left -= width);
            top + height > innerHeight && (top -= height);
            left < 0 && (left = 0);
            top < 0 && (top = 0);
            menu.style.left = left + 'px';
            menu.style.top = top + 'px';
            menu.focus();
            menu.addEventListener('blur', (e) => {
                document.body.removeChild(menu);
            });
            e.preventDefault();
        }
    })
})();

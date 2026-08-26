// Replaces the bits of Bootstrap's JS the site relied on: the navbar
// collapse toggle and modal show/hide, driven by the same data-* attributes.

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('[data-toggle="collapse"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = document.querySelector(btn.getAttribute('data-target'));
            if (!target) return;
            target.classList.toggle('show');
            btn.setAttribute('aria-expanded', target.classList.contains('show'));
        });
    });

    document.querySelectorAll('[data-toggle="modal"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = document.querySelector(btn.getAttribute('data-target'));
            if (target) target.classList.add('show');
        });
    });

    document.querySelectorAll('[data-dismiss="modal"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('show');
        });
    });

    document.querySelectorAll('.modal').forEach(function (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.classList.remove('show');
        });
    });

});

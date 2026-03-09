// ============ HEADER SCROLL BEHAVIOR ============
const headerTop = document.getElementById('headerTop-info');
const logotype = document.querySelector('.cMain__cont--infTop--hTop--citem--cLogo--logo');

function showHeader() {
  const heroImage = document.getElementById('fromHereFixedHeadTop');
  // Compara si el scroll actual supera el umbral del hero (offsetTop - altura del header)
  const shouldReduce = heroImage.offsetTop - 78 < document.documentElement.scrollTop;
  // Agrega o quita clases según la condición, sin necesidad de if/else
  headerTop.classList.toggle('reduxheight', shouldReduce);
  logotype.classList.toggle('sizeadd', shouldReduce);
}

document.addEventListener('scroll', showHeader);


// ============ TOGGLE MOBILE MENU ============
document.getElementById('m-show-hpage')
  ?.addEventListener('click', () => document.getElementById('main-m-htop')?.classList.toggle('show'));


// ============ LAZY IMAGE LOAD (remove blur placeholder) ============
document.body.addEventListener('load', (e) => {
  // Solo actúa si el elemento que terminó de cargar es una imagen
  if (e.target.tagName === 'IMG') e.target.style.backgroundImage = 'none';
}, true); // "true" = usa capture para interceptar el evento antes de que llegue al target


// ============ COOKIE UTILS ============
const Cookie = {
  get: (name) => {
    // Busca en todas las cookies la que coincida con el nombre dado
    const match = document.cookie.split(';').find(c => c.trim().startsWith(`${name}=`));
    // Si la encuentra, extrae solo el valor (después del "nombre="); si no, retorna null
    return match ? match.trim().slice(name.length + 1) : null;
  },
  set: (name, value, years = 10) => {
    // Calcula la fecha de expiración sumando los años indicados (default: 10)
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + years);
    document.cookie = `${name}=${value}; expires=${expires.toGMTString()}; path=/`;
  },
  delete: (name) => {
    // Sobreescribe la cookie con una fecha expirada en el pasado para eliminarla
    document.cookie = `${name}=; expires=${new Date(0).toGMTString()}; path=/`;
  }
};


// ============ DARK / LIGHT THEME ============
const THEME_COOKIE = 'prjMemopay-theme';
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  // classList.toggle con segundo argumento booleano agrega la clase si es true, la quita si es false
  // Así se evita tener que hacer removeClass + addClass manualmente
  document.body.classList.toggle('dark-theme', theme === 'dark');
  document.body.classList.toggle('light-theme', theme === 'light');
  Cookie.set(THEME_COOKIE, theme);
}

// Prioridad: cookie guardada → preferencia del sistema → 'light' por defecto
const savedTheme = Cookie.get(THEME_COOKIE) ?? (prefersDark ? 'dark' : 'light');
applyTheme(savedTheme);

document.getElementById('darkmode-toggle')
  ?.addEventListener('change', function () {
    const current = Cookie.get(THEME_COOKIE);
    // Alterna entre dark y light leyendo el valor actual de la cookie
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
export const StyleSheet = {
  create: (styles) => styles,
};

export function toInlineStyle(styleObj = {}) {
  return Object.entries(styleObj)
      .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${cssKey}:${value}`;
      })
      .join(';');
}

export function Alert({ text }){
  return`
    <script>alert(${text})</script>
  `;
}

export function Webpage({ pageTitle, children }) {
  return `
    <html>
      <head>
      <!-- Injecting the client-side JavaScript from FireLib -->
        <script>
          window.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('[data-onclick]').forEach(el => {
              const handlerStr = el.getAttribute('data-onclick');
              const handler = new Function('return ' + handlerStr)();
              el.addEventListener('click', handler);
              el.removeAttribute('data-onclick');
            });
          });
        </script>
      <title>${pageTitle}</title></head>
      <body>${children.join('')}</body>
    </html>
  `;
}
  
export function Title({ children, type, style }) {
  let Titletype;
  if(type == "Title1") Titletype = "h1";
  if(type == "Title2") Titletype = "h2";
  if(type == "Title3") Titletype = "h3";
  if(type == "Title4") Titletype = "h4";
  if(type == "SubTitle") Titletype = "h5";
  return `<${Titletype} style="${toInlineStyle(style)}">${children.join('')}</${Titletype}>`;
}

export function Block({ children, style }) {
  return `<div style="${toInlineStyle(style)}">${children.join('')}</div>`;
}

export function Button({ content, id, name, classe, style, onClick }) {
  const attrs = [];

  if (onClick && !id) throw new Error("To use onClick, the Button must have a unique ID!");

  if (content) attrs.push(`value='${content}'`);
  if (id) attrs.push(`id='${id}'`);
  if (name) attrs.push(`name='${name}'`);
  if (classe) attrs.push(`class='${classe}'`);
  if (style) attrs.push(`style='${toInlineStyle(style)}'`);

  if (onClick) {
    attrs.push(`data-onclick="${onClick.toString()}"`);
  }

  return `<input type='button' ${attrs.join(' ')}>`;
}

export function AreaButton({children, id, name, classe, style, onClick}){
  const attrs = [];

  if (onClick && !id) throw new Error("To use onClick, the AreaButtons must have a unique ID!");

  if(id) attrs.push(`id='${id}'`);
  if(name) attrs.push(`name='${name}'`);
  if(classe) attrs.push(`class='${classe}'`);
  if(style) attrs.push(`style='${toInlineStyle(style)}'`);

  if (onClick) {
    attrs.push(`data-onclick="${onClick.toString()}"`);
  }

  if(children) return `<div ${attrs.join(' ')}>${children}</div>`;
  if(!children) throw new SyntaxError("AreaButtons, should have children elements!")
}

export function TextLine({ children, style = {} }) {
  return `<p style="${toInlineStyle(style)}">${children.join('')}</p>`;
}

export function Text({ children, style = {} }) {
  return `<div style="${toInlineStyle(style)}">${children.join('')}</div>`;
}

export function TextInput({ id, name, value = '', placeholder = '', style = {}, onInput }) {
  const attrs = [
    `type='text'`,
    `value='${value}'`,
    `placeholder='${placeholder}'`,
    style ? `style="${toInlineStyle(style)}"` : '',
    id ? `id='${id}'` : '',
    name ? `name='${name}'` : ''
  ];
  if (onInput) {
    if (!id) throw new Error("TextInput with onInput must have an ID!");
    attrs.push(`data-oninput="${onInput.toString()}"`);
  }
  return `<input ${attrs.join(' ')}>`;
}

export function NumberInput({ id, name, value = 0, placeholder = '', style = {}, onInput }) {
  const attrs = [
    `type='number'`,
    `value='${value}'`,
    `placeholder='${placeholder}'`,
    style ? `style="${toInlineStyle(style)}"` : '',
    id ? `id='${id}'` : '',
    name ? `name='${name}'` : ''
  ];
  if (onInput) {
    if (!id) throw new Error("NumberInput with onInput must have an ID!");
    attrs.push(`data-oninput="${onInput.toString()}"`);
  }
  return `<input ${attrs.join(' ')}>`;
}

export function Option({ value, label, children = [], selected = false }) {
  const text = children.length > 0 ? children.join('') : (label || value);
  return `<option value="${value}" ${selected ? 'selected' : ''}>${text}</option>`;
}


export function Selector({ id, name, style = {}, children = [], options = [] }) {
  const attrs = [
    id ? `id='${id}'` : '',
    name ? `name='${name}'` : '',
    `style="${toInlineStyle(style)}"`
  ];

  const renderedOptions = children.length > 0
    ? children.join('')
    : options.map(opt => Option(opt)).join('');

  return `<select ${attrs.join(' ')}>${renderedOptions}</select>`;
}


export function BulletList({ items = [], organized = "false", style = {} }) {
  const tag = organized === "true" ? 'ol' : 'ul';
  return `<${tag} style="${toInlineStyle(style)}">${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
}

export function NumberList(props) {
  return BulletList({ ...props, organized: "true" });
}

export function Image({ src, alt = '', style = {}, width, height }) {
  const attrs = [
    `src="${src}"`,
    `alt="${alt}"`,
    style ? `style="${toInlineStyle(style)}"` : '',
    width ? `width="${width}"` : '',
    height ? `height="${height}"` : ''
  ];
  return `<img ${attrs.join(' ')}>`;
}

export function Audio({ src, controls = true, autoplay = false, loop = false, style = {} }) {
  return `<audio src="${src}" ${controls ? 'controls' : ''} ${autoplay ? 'autoplay' : ''} ${loop ? 'loop' : ''} style="${toInlineStyle(style)}"></audio>`;
}

export function Video({ src, controls = true, autoplay = false, loop = false, style = {}, width, height }) {
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  if (isYouTube) {
    const embedURL = src
      .replace('watch?v=', 'embed/')
      .replace('&list=', '?list=');

    return `<iframe width="${width}" height="${height}" src="${embedURL}" frameborder="0" 
      ${autoplay ? 'autoplay' : ''} 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen 
      style="${toInlineStyle(style)}"
    ></iframe>`;
  }
  return `<video src="${src}" ${controls ? 'controls' : ''} ${autoplay ? 'autoplay' : ''} ${loop ? 'loop' : ''} ${width ? `width="${width}"` : ''} ${height ? `height="${height}"` : ''} style="${toInlineStyle(style)}"></video>`;
}

export function SourceLink({ href }) {
  return `<link href="${href}">`;
}

export function SourceScript({ src, async = true, defer = false }) {
  return `<script src="${src}" ${async ? 'async' : ''} ${defer ? 'defer' : ''}></script>`;
}

export function Hyperlink({ href, text = '', target = '_blank', style = {} }) {
  return `<a href="${href}" target="${target}" style="${toInlineStyle(style)}">${text || href}</a>`;
}

export function Table({ children = [], style = {} }) {
  return `
    <table style="${toInlineStyle(style)}">
      ${children.join('')}
    </table>
  `;
}

export function TableRow({ children = [], style = {} }) {
  return `
    <tr style="${toInlineStyle(style)}">
      ${children.join('')}
    </tr>
  `;
}

export function TableColumn({ children = [], style = {}, header = false }) {
  const tag = header ? 'th' : 'td';
  return `<${tag} style="${toInlineStyle(style)}">${children.join('')}</${tag}>`;
}

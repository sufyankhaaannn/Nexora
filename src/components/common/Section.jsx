import './Section.css';

function Section({
  children,
  className = '',
  dark = false,
}) {
  return (
    <section
      className={`section ${dark ? 'section--dark' : ''} ${className}`}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}

export default Section;
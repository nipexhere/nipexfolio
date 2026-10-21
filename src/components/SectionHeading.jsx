import Reveal from './Reveal';

function SectionHeading({ index, label, title, accent, aside }) {
  return (
    <div className="section-heading">
      <p className="section-label"><span>{index}</span>{label}</p>
      <div className="section-heading-row">
        <Reveal as="h2">{title}<br /><span>{accent}</span></Reveal>
        {aside && <Reveal as="p" className="section-aside" delay={0.1}>{aside}</Reveal>}
      </div>
    </div>
  );
}

export default SectionHeading;

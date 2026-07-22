/** Decorative coordinate field shared by the hero and every atlas section. */
export default function ColumnRules({ className = '' }) {
  return (
    <div aria-hidden="true" className={['atlas-grid', className].join(' ')}>
      <span className="atlas-node left-[9%] top-[24%]" />
      <span className="atlas-node right-[13%] top-[16%]" />
      <span className="atlas-node bottom-[18%] left-[31%]" />
    </div>
  );
}

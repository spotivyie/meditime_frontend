export default function UserInfoItem({ label, children }) {
  return (
    <div className="md:col-span-4">
      <span className="font-semibold md:hidden">{label}: </span>
      {children}
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer bg-openAI_Primary py-4 mt-auto">
      <p className="text-teal-300 text-center text-base">
        All rights reserved <span className=" font-semibold">Boban dev</span>
        &copy;{currentYear}
      </p>
    </div>
  );
}

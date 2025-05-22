export default function FAQ() {
  return (
    <div className="flex flex-col items-center px-4 md:px-0">
      <div className="w-full">
        <h3 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <ul className="text-left space-y-6 max-w-2xl mx-auto">
          <li className="text-center">
            <h4 className="text-lg font-semibold">Is this free for commercial use?</h4>
            <p className="text-base">Yes.</p>
          </li>
          <li className="text-center">
            <h4 className="text-lg font-semibold">Does this support Kubernetes and Docker Swarm?</h4>
            <p className="text-base">No, currently we only support Standalone Docker on Linux.</p>
          </li>
          <li className="text-center">
            <h4 className="text-lg font-semibold">Why is it named Dokémon?</h4>
            <p className="text-base">Docker Manager → DockMan → DocMan → Dokémon<br />
              That&apos;s how we arrived at the name! Doesn&apos;t really mean anything.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

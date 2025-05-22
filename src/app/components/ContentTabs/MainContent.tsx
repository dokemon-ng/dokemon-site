import Image from "next/image";

export default function MainContent() {
  return (
    <div className="flex flex-col items-center px-4 md:px-0">
      <h2 className="text-xl mb-2 text-center font-semibold">
        Docker Container Management GUI
      </h2>
      <h3 className="mb-4 text-center text-base">
        Deploy compose files, start/stop containers, delete unused images,
        view logs.
      </h3>
      <div className="mb-10">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=dokemon-ng&repo=dokemon&type=star&count=true&size=large"
          width="128"
          height="30"
          title="GitHub"
        ></iframe>
      </div>

      <div className="mb-10 text-center w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-2">Manage Multiple Servers</h4>
        <Image
          src="/screenshot-dokemon-nodes.jpg"
          alt="Dokémon nodes management interface"
          width={900}
          height={500}
          className="w-full rounded-lg"
        />
      </div>
      <div className="mb-10 text-center w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-2">
          Manage Variables for Different Environments
        </h4>
        <Image
          src="/screenshot-dokemon-variables.jpg"
          alt="Dokémon variables management interface"
          width={900}
          height={500}
          className="w-full rounded-lg"
        />
      </div>
      <div className="mb-10 text-center w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-2">Deploy Compose Projects</h4>
        <Image
          src="/screenshot-dokemon-compose-up.jpg"
          alt="Dokémon compose project deployment interface"
          width={900}
          height={500}
          className="w-full rounded-lg"
        />
      </div>
      <div className="mb-10 text-center w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-2">
          Manage Containers, Images, Volumes, Networks
        </h4>
        <Image
          src="/screenshot-dokemon-containers.jpg"
          alt="Dokémon container management interface"
          width={900}
          height={500}
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}

import { formatDate } from "../lib/utils";

export default function LaunchCard(props: { launch: any }) {
  return (
    <div className="grid gap-2 text-left shadow-md shadow-gray-500 dark:hover:shadow-gray-300">
      <div className="pt-2 px-4">
        <h2 className="text-2xl font-bold">{props.launch.mission_name}</h2>
        <span className="text-sm font-bold text-gray-500">
          {formatDate(new Date(props.launch.launch_date_utc), "dd MMMM yyyy")}
        </span>
        <div className="pt-1 flex gap-2 text-sm text-white font-bold">
          {props.launch.launch_success && (
            <div
              className={`w-fit p-1 px-2 ${
                props.launch.launch_success
                  ? "bg-green-400 dark:bg-green-600"
                  : "bg-red-400 dark:bg-red-600"
              }`}
            >
              {props.launch.launch_success ? "Success" : "Failed"}
            </div>
          )}
          {props.launch.rocket && (
            <div className="w-fit p-1 px-2 bg-gray-600">
              {props.launch.rocket.rocket_name}
            </div>
          )}
        </div>
      </div>
      <p className="pb-2 px-4 shadow">{props.launch.details}</p>
      <div className="pt-2 pb-4 px-4">
        <a
          className="p-2 font-bold text-white bg-[#646cff] hover:bg-[#535bf2] cursor-pointer"
          href={props.launch.links.article_link}
          target="_blank"
        >
          Open Article
        </a>
        {props.launch.links.wikipeda && (
          <a href={props.launch.links.wikipedia} target="_blank">
            <img
              src="https://en.wikipedia.org/wiki/Wikipedia_logo#/media/File:Wikipedia-logo-v2.svg"
              alt="View Wikipeida Article"
            />
          </a>
        )}
      </div>
    </div>
  );
}

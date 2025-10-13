import { TagFromTags } from "@/api-fetcher/fetcher";
import { Link } from "@/components/juankui/optionals/link";
import { capitalize } from "@/utils/capitalize";

export function TagsList({ tags }: { tags: TagFromTags[] }) {
    return (
        <div>
            {tags.map((tag) => (
                <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className=" text-slate-700 font-bold border hover:border-slate-800 hover:text-slate-800 rounded px-2 "
                >
                    {capitalize(tag.name)}
                </Link>
            ))}
        </div>
    );
};

export default function UlMenuItem({children}) {
    return (
        <ul className="absolute top-full w-full left-0 hidden group-hover:block bg-mauve-900  z-50">{children}</ul>
    )
}
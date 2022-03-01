export default function getPathAvatar(path: string | null | undefined): string{
    return "" +process.env.REACT_APP_SERVER_ENDPOINT + path;
}
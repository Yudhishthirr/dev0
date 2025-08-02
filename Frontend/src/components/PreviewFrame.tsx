export function PreviewFrame({ url }: any) {
  
  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && <div className="text-center">
        <p className="mb-2">Loading...</p>
      </div>}
      {url && <iframe width="1400px" height={"100%"} src={url} />}
    </div>
  );
}

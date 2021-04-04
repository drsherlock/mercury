export const profilerMiddleware = (req, res, next) => {
	const start = Date.now();
	// The 'finish' event comes from core Node.js, it means Node is done handing
	// off the response headers and body to the underlying OS.
	res.on("finish", () => {
		console.log("Completed", req.method, req.url, Date.now() - start);
	});
	next();
};

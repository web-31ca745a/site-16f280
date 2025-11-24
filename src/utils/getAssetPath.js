// Helper function to get correct asset paths for both development and production
export const getAssetPath = (path) => {
    // If path already includes the base, return as is
    if (path.startsWith(import.meta.env.BASE_URL)) {
        return path;
    }
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // BASE_URL already has trailing slash
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export default getAssetPath;

export const obtainImageUrl  = (image: string|undefined) => {
 if(!image) return null;
 const urlPath = image.split('\\');
 const url = urlPath.join('/');
 const removePublic = url.split('public');
 const imageUrl = removePublic[1];
 return '/static'+ imageUrl;
}
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
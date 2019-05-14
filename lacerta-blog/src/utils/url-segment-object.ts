export const getURLSegmentObject = (path: string): string[] => {
  try {
    return path.split('/').filter(s => s.length > 0);
  } catch (e) {
    console.error(e);
  }
  return [];
};
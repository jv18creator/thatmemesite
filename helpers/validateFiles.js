export const validateFiles = (value) => {
  if (value?.length < 1 || !value) {
    return "Files is required";
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024);
    const MAX_FILE_SIZE = 10;
    if (fsMb > MAX_FILE_SIZE) {
      return "Max file size 10mb";
    }
  }
  return true;
};

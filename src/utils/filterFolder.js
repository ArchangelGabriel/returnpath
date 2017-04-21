function filterFolder(folder, obj) {
  return folder ? (folder === 'All' ? true : obj.folder === folder) : true;
};

export default filterFolder;

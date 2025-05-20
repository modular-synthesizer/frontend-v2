const fileNames = ['common', 'login', 'menu', 'synthesizers'];

function getFileList(locale: string) {
  return fileNames.map(name => `${locale}/${name}.json`);
}

export default {
  locales: [
    { code: 'fr', name: 'Français', files: getFileList('fr') },
  ]
}
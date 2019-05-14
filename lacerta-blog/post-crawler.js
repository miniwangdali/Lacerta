const fs = require('fs');
const path = require('path');


const yamlFrontMatter = require('yaml-front-matter');

const postsFolders = [
  '_posts',
  'frontend-interview'
];

const pagesFolders = ['_pages'];

const generateFileList = (pathArray) => {
  const list = [];
  pathArray.map(p => {
    const absolutePath = path.resolve(__dirname, '../', p);
    try {
      const results = fs.readdirSync(absolutePath);
      results.forEach(subP => {
        list.push(...getAbsolutePathList(path.join(absolutePath, subP)));
      });
    } catch (e) {
      console.error(e);
    }
  });
  return list;
};

const getAbsolutePathList = p => {
  const resultList = [];
  try {
    if(fs.lstatSync(p).isDirectory()) {
      const files = fs.readdirSync(p);
      files.forEach(f => {
        const list = getAbsolutePathList(path.join(p, f));
        resultList.push(...list);
      });
    } else {
      resultList.push(p);
    }
  } catch (e) {
    console.error(e);
  }
  return resultList;
};

const getDocs = folders => {
  const fileList = generateFileList(folders);
  const docs = [];
  fileList.forEach(p => {
    try {
      const text = fs.readFileSync(p);
      const data = yamlFrontMatter.loadFront(text, {
        contentKeyName: 'markdown'
      });
      docs.push(data);
    } catch (e) {
      console.error(e);
    }
  });
  return docs;
};

const writeRecords = (name, data) => {
  try {
    fs.writeFileSync(path.resolve(__dirname, name), data);
  } catch (e) {
    console.log(e);
  }
};

const pages = getDocs(pagesFolders);
const posts = getDocs(postsFolders);
writeRecords('posts.json', JSON.stringify([...pages, ...posts], null, 2));


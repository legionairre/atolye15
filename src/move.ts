// List Shape
type List = Folder[];
// Folder Shape
type Folder = {
  id: string;
  name: string;
  files: File[];
};
// File Shape
type File = {
  id: string;
  name: string;
};
/**
 * move function moves a file to another folder and returns the new state of given list.
 * @param list -> folder_list
 * @param source -> file_id
 * @param destination -> folder_id
 */
export default function move(list: List, source: string, destination: string): List {
  let foundFile: File;
  let foundFolder: Folder;
  let breakState: boolean;

  list.forEach((folder: Folder, folderIndex) => {
    if (breakState) {
      return;
    }
    if (folder.id === '') {
      throw new Error('Folder ID cannot be empty');
    }
    folder.files.forEach((file: File, fileIndex) => {
      if (breakState) {
        return;
      }
      if (file.id === '') {
        throw new Error('File ID cannot be empty');
      }
      if (file.id === source) {
        foundFile = file;

        list.forEach((mainFolder: Folder, mainFolderIndex) => {
          if (mainFolder.id === destination) {
            foundFolder = mainFolder;
            mainFolder.files.push(foundFile);
          }
          if (mainFolderIndex === list.length - 1) {
            // also 'typeof' control can be done
            if (!foundFolder) {
              throw new Error('You cannot specify a file as the destination');
            }
          }
        });

        folder.files.splice(fileIndex, 1);
        breakState = true;
      }
    });
    if (folderIndex === list.length - 1) {
      // also 'typeof' control can be done
      if (!foundFile) {
        throw new Error('You cannot move a folder');
      }
    }
  });

  return list;
}

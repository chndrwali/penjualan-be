const fs = require("fs");

// Tentukan jalur folder untuk kategori, kustomisasi, dan produk
const categoriesFolder = "./public/uploads/categories";
const customizeFolder = "./public/uploads/customize";
const productsFolder = "./public/uploads/products";

// Fungsi untuk membuat folder jika belum ada
const createAllFolders = () => {
  createFolderIfNotExist(categoriesFolder);
  createFolderIfNotExist(customizeFolder);
  createFolderIfNotExist(productsFolder);
};

// Fungsi untuk membuat folder jika belum ada
const createFolderIfNotExist = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Export fungsi pembuatan folder
module.exports = createAllFolders;

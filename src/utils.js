function createFormData(formData, key, data) {
  if (key !== "inputFiles" && (data === Object(data) || Array.isArray(data))) {
    for (var i in data) {
      createFormData(formData, key + "[" + i + "]", data[i]);
    }
  } else if (typeof data === "boolean") {
    formData.append(key, data.toString());
  } else if (key == "inputFiles") {
    for (const file of data) {
      formData.append(key, file);
    }
  } else {
    formData.append(key, data);
  }
}

module.exports = createFormData;
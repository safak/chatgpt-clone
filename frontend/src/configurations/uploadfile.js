const handleFileUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]); // Add the file to the form data

    try {
        const response = await fetch("/api/user/upload-file", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Add JWT token
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("File upload failed");
        }

        const data = await response.json();
        console.log("File uploaded successfully:", data.fileUrl); // Log the uploaded file URL
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};

return (
    <input type="file" onChange={handleFileUpload} />
);

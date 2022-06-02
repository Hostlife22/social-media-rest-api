const uploadFile = (req, res) => {
    try {
        return res.status(200).json('File uploded successfully');
    }
    catch (error) {
        console.error(error);
    }
};
export default uploadFile;

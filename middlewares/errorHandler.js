const errorHandler = (err, req, res, next) => {
  if (err.name === 'credential') {
    res.status(400).json({ message: 'Invalid Credential' });
  } else if (err.name === 'unauthorized') {
    res.status(401).json({ message: 'Unauthorized' });
  } else if (err.name === 'notFound') {
    res.status(404).json({ message: 'Error Not Found' });
  } else if (err.name === 'dataExist') {
    res.status(409).json({ message: 'Email or username already exist' });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = errorHandler;

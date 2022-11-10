const createFileMock = (args: Partial<Express.Multer.File> = {}): Express.Multer.File => ({
  fieldname: '',
  originalname: '',
  encoding: '',
  mimetype: '',
  size: 0,
  stream: null,
  destination: '',
  filename: '',
  path: '',
  buffer: undefined,
  ...args,
});

export default createFileMock;

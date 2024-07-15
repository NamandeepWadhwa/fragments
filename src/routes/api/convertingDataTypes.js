const markdown = require('markdown-it');
const { Fragment } = require('../../model/fragment');
const response = require('../../response');

module.exports = async (req, res) => {
  const md = new markdown();

  const id = req.params.id;
  const ownerId = req.user;

  try {
    const fragment = await Fragment.byId(ownerId, id);
    let data = await fragment.getData();

    if (fragment.type === 'text/markdown') {
     const text= data.toString('utf-8');
      data = md.render(text); // Render Markdown to HTML
    } else {
      data = data.toString('utf-8'); // Convert other types to string
    }
    console.log(data);
    const senddata = {
      type: 'text/html',
      size: fragment.size,
      data: data, // Assign rendered HTML or plain text
    };

    res.status(200).json(response.createSuccessResponse({ senddata }));
  } catch (err) {
    console.log(err);
    res.status(500).json(response.createErrorResponse(500, err));
  }
};

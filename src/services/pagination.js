const pagination = async (request, PAGE_SIZE=10, modelName) => {
    let page = 1;
    let skip;
    let documentCount;
    let totalPages;
    let nextPage;

    if (request.query.page) {
      page = Number(request.query.page);
      skip = (page - 1) * PAGE_SIZE;
    }

    const docCount = await modelName.find({}).countDocuments();
    const totalPagesCount = Number(Math.ceil(docCount / PAGE_SIZE));

    return {
        documentCount: docCount,
        totalPages: totalPagesCount,
        nextPage: (totalPagesCount > page) ? `${page + 1}` : null, 
    }
}

export default pagination;

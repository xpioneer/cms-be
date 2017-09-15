/*qinfeng*/

import ArticleDao from '../daos/ArticleDao'

class ArticleService {

	static async getById (id) {
		const article = await ArticleDao.getById(id);
		return article;
	}

	static async pages (conditions) {
		const pages = await ArticleDao.pages(conditions);
		return pages;
	}

	static async insert (model) {
		const result = await ArticleDao.insert(model);
		return result;
	}

	// static async update (model) {
	// 	const result = await Article.update(model);
	// 	return result;
	// }

	// //更新状态删除
	// static async delete (id) {
	// 	const result = await Article.delete(id);
	// 	return result;
	// }

}

export default ArticleService;
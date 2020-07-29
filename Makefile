watch_lint:
	while inotifywait -e close_write **/*.ts; do npm run lint:fix; done
prepare_publish:
	npm run build && npm run lint && npm run docs


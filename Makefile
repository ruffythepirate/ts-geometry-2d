watch_lint:
	while inotifywait -e close_write **/*.ts; do npm run lint:fix; done


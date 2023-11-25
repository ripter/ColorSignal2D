.PHONY: all clean lint server test build run

all: lint test server

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

lint: node_modules/
	npx eslint --fix src/*.mjs src/**/*.mjs src/**/*.test.js

server: node_modules/
	npx http-server public/ -o

test: node_modules/
	# npx mocha src/**/**.test.js
	testament pattern "./tests/*.nim"



node_modules/: package.json
	npm install
	touch node_modules/

build:
	nim compile --outDir:"./out" src/main.nim

run:
	nim compile --outDir:"./out" --run src/main.nim

deploy:
	nim compile --outDir:"./out" -d:release src/main.nim
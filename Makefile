dev: clean
	@npx yarn --cwd ui install
	@npx yarn --cwd ui watch &
	@wait ${!}
	@./gradlew quarkusDev

build: clean
	@npx yarn --cwd ui install
	@npx yarn --cwd ui deploy
	@cp -rf ui/static src/main/resources/META-INF/resources/static
	@./gradlew build -Dquarkus.package.type=native

clean:
	@rm -rf \
		build \
		ui/static \
		src/main/resources/META-INF/resources/static

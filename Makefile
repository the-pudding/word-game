PHONY: github netlify pudding

github:
	rm -rf docs
	cp -r build docs
	touch docs/.nojekyll
	git add -A
	git commit -m "update github pages"
	git push

netlify: 
	rm -rf netlify
	mkdir netlify
	cp -r build netlify/subdirectory
	
aws-sync:
	aws s3 sync build s3://pudding.cool/games/words-against-strangers --delete --cache-control 'max-age=31536000'

aws-cache:
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/games/words-against-strangers*'	

pudding: aws-sync aws-cache
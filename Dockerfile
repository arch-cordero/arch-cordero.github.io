FROM ruby:3.3-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libvips-dev \
    libvips-tools \
    libyaml-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /site

ENV HOME=/site \
    BUNDLE_PATH=vendor/bundle

EXPOSE 4000

CMD ["sh", "-c", "bundle install && bundle exec jekyll serve --host 0.0.0.0 --livereload"]

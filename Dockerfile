FROM fedora:29 as build
RUN dnf --assumeyes install redhat-rpm-config
RUN dnf --assumeyes install rubygem-bundler
RUN curl -sL https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo
RUN dnf --assumeyes install yarn
RUN dnf --assumeyes install git
RUN dnf --assumeyes group install "C Development Tools and Libraries"
RUN dnf --assumeyes install ruby-devel
RUN dnf --assumeyes install libffi-devel
USER nobody
WORKDIR /tmp
RUN git clone https://github.com/ashphy/jsonpath-online-evaluator.git
WORKDIR jsonpath-online-evaluator
RUN git checkout 774a9dc
ENV HOME=/tmp/jsonpath-online-evaluator/home
RUN mkdir -p $HOME
RUN bundle install --deployment
RUN bundle exec yarn install
RUN bundle exec yarn run build

FROM httpd:2.4
COPY --from=build /tmp/jsonpath-online-evaluator/dist/ /usr/local/apache2/htdocs/

FROM node:10.13

# Copy folder to workspace
WORKDIR /usr/src/students-api
COPY . /usr/src/students-api

# Install Oracle Instant Client
RUN apt-get update && apt-get install -y libaio1 unzip
RUN mkdir -p /opt/oracle
RUN unzip bin/instantclient-basiclite-linux.x64-12.2.0.1.0.zip -d /opt/oracle
RUN cd /opt/oracle/instantclient_12_2 \
 && ln -s libclntsh.so.12.1 libclntsh.so \
 && ln -s libocci.so.12.1 libocci.so
RUN echo /opt/oracle/instantclient_12_2 > /etc/ld.so.conf.d/oracle-instantclient.conf \
 && ldconfig

# Install dependent packages via yarn
RUN yarn

# Run unit tests
RUN ./node_modules/.bin/gulp test
USER nobody:nogroup

# Run application
ENTRYPOINT ["./node_modules/.bin/gulp", "run"]
